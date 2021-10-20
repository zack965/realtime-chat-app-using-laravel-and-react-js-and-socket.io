<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $primaryKey="conversation_id";
    protected $fillable = ['conversation_first_partner','conversation_second_partner'];
    public function messages(){
        return $this->hasMany(Message::class,'conversation_id');
    }
}