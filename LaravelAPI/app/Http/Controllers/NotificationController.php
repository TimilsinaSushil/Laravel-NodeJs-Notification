<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\RabbitMQPublisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        try {
        $this->publisher->publish([
            'id' => $notification->id,
            'title' => $notification->title,
            'body' => $notification->body,
            'type' => $notification->type,
            'created_at' => $notification->created_at,
        ]);
        } catch (\Exception $e) {
            Log::error('RabbitMQ Publish Failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to publish message'], 500);
        }

        return response()->json(['status' => 'Notification published'], 201);
    }
}
