<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AtUser extends Model{

    protected  $primaryKey = 'uid';
    
     /**
    * The table associated with the model.
    *
    * @var string
    */
    protected $table = 'at_user';


    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
