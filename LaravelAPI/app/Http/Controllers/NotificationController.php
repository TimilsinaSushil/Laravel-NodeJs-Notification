<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\RabbitMQPublisher;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $publisher;

    public function __construct(RabbitMQPublisher $publisher)
    {
        $this->publisher = $publisher;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'type' => 'required|string',
        ]);

        $notification = Notification::create($data);

        $this->publisher->publish([
            'id' => $notification->id,
            'title' => $notification->title,
            'body' => $notification->body,
            'type' => $notification->type,
            'created_at' => $notification->created_at,
        ]);

        return response()->json(['status' => 'Notification published'], 201);
    }
}
