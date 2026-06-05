<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Element;
use App\Models\ElementAttribute;

class ElementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = Element::orderBy('order')->get();

        return $elements->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
        ]);

        $element = Element::where('activity_id', $request->activity_id)->orderBy('order', 'desc')->first();

        $order = ($element)?$element['order']:0;

        $element = Element::create([
            'activity_id' => $request->activity_id,
            'name' => $validatedData['name'],
            'order' => $order+1,
        ]);

        switch ($element->name) {
          case 'heading':
            $element_attributes = [
                new ElementAttribute(['name' => 'title', 'value' => '']),
                new ElementAttribute(['name' => 'description', 'value' => '']),
            ];
            break;
          case 'text':
            $element_attributes = [
                new ElementAttribute(['name' => 'title', 'value' => '']),
                new ElementAttribute(['name' => 'description', 'value' => '']),
            ];
            break;
          case 'image':
            $element_attributes = [
                new ElementAttribute(['name' => 'title', 'value' => '']),
                new ElementAttribute(['name' => 'src', 'value' => '']),
                new ElementAttribute(['name' => 'alt', 'value' => '']),
            ];
            break;
          default:
            $element_attributes = [];
            break;
        }

        $element->element_attributes()->saveMany($element_attributes);

        $element->refresh();

        $element->element_attributes;

        return $element->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function show(Element $element)
    {
        $element = Element::with(['element_attributes' => function ($query) {
            ;
        }])->find($element->id);

        return $element->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Element $element)
    {
        if( $request->input('name') ) $element->name = $request->input('name');
        if( $request->input('order') ) $element->order = $request->input('order');
        $element->update();

        return $element->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Element  $element
     * @return \Illuminate\Http\Response
     */
    public function destroy(Element $element)
    {
        $element->delete();
        return response()->json('Element deleted!');
    }
}
