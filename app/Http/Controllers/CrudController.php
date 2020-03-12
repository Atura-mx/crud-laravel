<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AtUser;
class CrudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $list = AtUser::all();
        return view("crud.index",array("users"=>$list));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $input = $request->all();
        $at_user = new AtUser;

        $at_user->name = $input['name'];
        $at_user->email = $input['email'];
        $at_user->telephone = $input['telephone'];
        $at_user->date_creation = date("Y-m-d H:i:s");

        if($at_user->save()){
            return response()->json(["message"=>"OK!","code" => "200"]);   
        } 
        else{
            return response()->json(["message"=>"Error!", "code" => "300"]);
        }      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request){
        $input = $request->all();
        
        if(!$input['uid'])return response()->json(["message"=>"Error!","code"=>300]);   

        $list = AtUser::find($input['uid']);
        return response()->json(["message"=>"OK!","code"=>200,"data" => $list]);   
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
        $input = $request->all();
        
        if(!$input['uid'])return response()->json(["message"=>"Error!","code"=>300]);   

        $at_user = AtUser::find($input['uid']);
        $at_user->name = $input['name'];
        $at_user->email = $input['email'];
        $at_user->telephone = $input['telephone'];

         if($at_user->save()){
            return response()->json(["message"=>"OK!","code" => "200"]);   
        } 
        else{
            return response()->json(["message"=>"Error!", "code" => "300"]);
        }      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request){
        $input = $request->all();
        
        if(!$input['uid'])return response()->json(["message"=>"Error!","code"=>300]);   

        $at_user = AtUser::find($input['uid']);
        if($at_user->delete()){
            return response()->json(["message"=>"OK!","code" => "200"]);   
        } 
        else{
            return response()->json(["message"=>"Error!", "code" => "300"]);
        } 
    }
    
    /**
     * Search
     */
    public function search(Request $request){
        $input = $request->all();
        if(!$input['val'])return response()->json(["message"=>"Error!","code"=>300]);   

        $list = AtUser::query()
                    ->where("name",'LIKE',"{$input['val']}%")
                    ->get();       
        return view("crud.search",array("users"=>$list));
    }
}
