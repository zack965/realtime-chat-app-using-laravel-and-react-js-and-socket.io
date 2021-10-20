<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    //
    public function ConversationUser($user_id){
        if(Conversation::where('conversation_first_partner',$user_id)->orWhere('conversation_second_partner',$user_id)->exists()){
            $conversations = Conversation::where('conversation_first_partner',$user_id)->orWhere('conversation_second_partner',$user_id)
            ->join("users as first_part",'conversations.conversation_first_partner','first_part.id')
            ->join("users as second_part",'conversations.conversation_second_partner','second_part.id')
            //->orderBy('updated_at', 'desc')
            ->select('*','first_part.name as first_part_name','second_part.name as second_part_name')
            ->get();
            $count_conversations = $conversations->count();
            $Data_arr = array();
            $last = array();
            for ($i = 0; $i < $count_conversations; $i++) {
                //$conversations[$i]->messages->last();
                array_push($Data_arr,
                    //json_encode(
                    ['f_name'=>$conversations[$i]->first_part_name,
                    'last_n'=>$conversations[$i]->second_part_name,
                    'conversation_first_partner'=>$conversations[$i]->conversation_first_partner,
                    'conversation_second_partner'=>$conversations[$i]->conversation_second_partner,
                    'last_message'=>$conversations[$i]->messages->last()]
                    //['last_n'=>$conversations[$i]->second_part_name],
                    //['last_message'=>$conversations[$i]->messages->last()]
                    //)
                );
                //array_push($last,json_encode($Data_arr));
                //$Data_arr = array();
            }
            $conversations[0]->messages;
            $c = Conversation::find(1);

            //$sorted = $conversations->sortBy('message_id');

            //return response()->json(['conversations'=>$c->messages]);
            return response()->json(['conversations'=>$Data_arr]);
        }else{
            return response()->json(['msg'=>"conversation does not exists"]);
        }

    }
    public function GetMessagesOfConversation($cnv_id){
        if(Conversation::where('conversation_id',$cnv_id)->exists()){
            //$messages=Conversation::find($cnv_id)->messages;

            //->select('message_id','message_sender','conversation_id','message_body','message_is_read')
            //->messages;
            $messages = Message::where('conversation_id',$cnv_id)
            ->select('message_id','message_sender','conversation_id','message_body','message_is_read')
            ->get();
            return response()->json(['messages'=>$messages]);
        }else{
            return response()->json(['msg'=>"conversation does not exists"]);
        }
    }
}