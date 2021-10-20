<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $primaryKey="message_id";
    protected $fillable = ['message_sender','conversation_id','message_body','message_is_read','message_receiver'];
    public function conversation(){
        return $this->belongsTo(Conversation::class,'conversation_id');
    }
}