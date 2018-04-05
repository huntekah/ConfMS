<?php
/**
 * Created by PhpStorm.
 * User: olejs
 * Date: 22.01.18
 * Time: 00:57
 */

namespace App\Http\Controllers;

use App\Sections;
use Validator;
use App\Http\Validators\ApiValidator;
use App\Conference;
use Illuminate\Http\Request;

class SectionsController extends Controller
{
    public function add(Sections $sections, Request $request, Conference $conference){

        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'patch' => 'required|string|max:50',
            'location' => 'required|string|max:50',
            'price' => 'required|between:1,999999999',
            'bookCapacity' => 'required|between:0,999999999',
            'startDate' => 'required|in:workshop,talk,poster',
            'endDate' => 'required|integer|between:0,1440'
        ], ApiValidator::getMessages());

        if($validatedData->fails()) {
            $errors = $validatedData->messages();
            return response()->json(ApiValidator::response($errors, array()), 400);
        }

        $conf = $conference->getConference();


    }
}

