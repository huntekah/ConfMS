<?php
/**
 * Created by PhpStorm.
 * User: olejs
 * Date: 22.01.18
 * Time: 00:59
 */

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Sections extends Eloquent
{
    protected $collection = 'conference_sections';

    public function insert(){

    }
}