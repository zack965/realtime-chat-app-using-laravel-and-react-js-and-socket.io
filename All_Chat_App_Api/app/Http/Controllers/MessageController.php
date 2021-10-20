<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Models\User;

class MessageController extends Controller
{
    //
    public function SendMessage(Request $request){
        $request->validate([
            'conversation_first_partner'=>'required|numeric',
            'conversation_second_partner'=>'required|numeric'
        ]);
        if(Conversation::where('conversation_first_partner',$request->conversation_first_partner)->Where('conversation_second_partner',$request->conversation_second_partner)->exists()){
            $request->validate([
                'message_sender'=>'required|numeric',
                'conversation_id'=>'required|numeric',
                'message_body'=>'required|string',
                'message_is_read'=>'required|string',
            ]);
            $m = Message::create([
                'message_sender'=>$request->message_sender,
                'conversation_id'=>$request->conversation_id,
                'message_body'=>$request->message_body,
                'message_is_read'=>$request->message_is_read,
                'message_receiver'=>$request->message_receiver,
            ]);
            $user_receiver = User::find($request->message_receiver);
            return response()->json(['msg'=>"message created successfully",'data_message'=>$m,'user_receiver'=>$user_receiver]);
        }else{
            $new_conversation = Conversation::create([
                'conversation_first_partner'=>$request->conversation_first_partner,
                'conversation_second_partner'=>$request->conversation_second_partner
            ]);
            Message::create([
                'message_sender'=>$request->message_sender,
                'conversation_id'=>$new_conversation->conversation_id,
                'message_body'=>$request->message_body,
                'message_is_read'=>$request->message_is_read,
                'message_receiver'=>$request->message_receiver,
            ]);
            return response()->json(['msg'=>"conversation and message created successfully"]);

            //return response()->json(['msg'=>"cnvr does not exists"]);
        }
    }
}