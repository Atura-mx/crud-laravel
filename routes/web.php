<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**Route::get('/', function () {
    return view('layout.home');
});*/
Route::get('/',"CrudController@index");
Route::get('search',"CrudController@search");
Route::post('store',"CrudController@store");
Route::post('edit',"CrudController@edit");
Route::post('update',"CrudController@update");
Route::post('destroy',"CrudController@destroy");

