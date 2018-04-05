<?php
/**
 * Created by PhpStorm.
 * User: olejs
 * Date: 21.01.18
 * Time: 00:00
 */

namespace App\Http\Controllers;

use App\Events;
use Validator;
use App\Http\Validators\ApiValidator;
use App\Conference;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * @param Request $request
     * @param Events $events
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request, Events $events){

        $validatedData = Validator::make($request->all(), [
                'name' => 'required|max:100',
                'description' => 'required|string|max:1000',
                'type' => 'required|in:workshop,talk,poster',
                'duration' => 'required|integer|between:0,1440',
                'presenter' => 'required|string|max:100'
            ], ApiValidator::getMessages());

        if($validatedData->fails()) {
            $errors = $validatedData->messages();
            return response()->json(ApiValidator::response($errors, array()), 400);
        }

        $name = $request->name;
        $description = $request->description;
        $type = $request->type;
        $duration = $request->duration;
        $presenter = $request->presenter;

        $id = $events->insert($name, $description, $type, $duration, $presenter);

        return response()->json(['id' => $id], 200);
    }

    /**
     * @param Request $request
     * @param Events $events
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Events $events, $id){

        $arrayToValidate = array('id' => $id);

        $validatedData = Validator::make($arrayToValidate, [
            'id' => 'exists:conference_events,_id'
        ], ApiValidator::getMessages());

        if($validatedData->fails()){
            $errors = $validatedData->messages();
            return response()->json(ApiValidator::response($errors, array()), 400);
        }

        $validatedData = Validator::make($request->all(), [
            'name' => 'required|max:100',
            'description' => 'required|string|max:1000',
            'type' => 'required|in:workshop,talk,poster',
            'duration' => 'required|integer|between:0,1440',
            'presenter' => 'required|string|max:100'
        ], ApiValidator::getMessages());

        if($validatedData->fails()) {
            $errors = $validatedData->messages();
            return response()->json(ApiValidator::response($errors, array()), 400);
        }

        $name = $request->name;
        $description = $request->description;
        $type = $request->type;
        $duration = $request->duration;
        $presenter = $request->presenter;

        $id = $events->updateEvent($id, $name, $description, $type, $duration, $presenter);

        return response()->json(['id' => $id]);
    }

    /**
     * @param Events $events
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll(Events $events){
        $array = $events->all();
        $json = [];
        foreach($array as $row){
            $json[] = [
                'id' => $row->_id,
                'name' => $row->name,
                'description' => $row->description,
                'type' => $row->type,
                'duration' => $row->duration,
                'presenter' => $row->presenter
            ];
        }

        return response()->json($json, 200);
    }

    /**
     * @param Events $events
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Events $events, $id){

        $arrayToValidate = array('id' => $id);

        $validatedData = Validator::make($arrayToValidate, [
            'id' => 'exists:conference_events,_id'
        ], ApiValidator::getMessages());

        if($validatedData->fails()){
            $errors = $validatedData->messages();
            return response()->json(ApiValidator::response($errors, array()), 400);
        }

        Events::destroy($id);
    }
}