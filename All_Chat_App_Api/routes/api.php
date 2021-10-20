<?php

use App\Http\Controllers\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('LogOut',[AccountController::class , 'LogOut']);
    Route::get('GetMessagesOfConversation/{cnv_id}',[ConversationController::class,'GetMessagesOfConversation'])->name('GetMessagesOfConversation');
    Route::post('SendMessage',[MessageController::class,'SendMessage'])->name('SendMessage');
});

    Route::get('ConversationUser/{user_id}',[ConversationController::class,'ConversationUser'])->name('ConversationUser');


Route::post('register',[AccountController::class,'register']);
Route::post('login',[AccountController::class,'login']);
