<?php

namespace App\Http\Controllers;

use App\Models\CourseGroup;
use Illuminate\Http\Request;

class CourseGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courseGroups = CourseGroup::get();

        return $courseGroups->toJson();
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
        $validatedData = $request->validate(['title' => 'required']);

        $courseGroup = CourseGroup::create([
          'title' => $validatedData['title'],
          'description' => $request->description,
          'vet_package_id' => $request->vet_package_id,
        ]);

        return $courseGroup->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseGroup  $courseGroup
     * @return \Illuminate\Http\Response
     */
    public function show(CourseGroup $courseGroup)
    {
        $courseGroup = CourseGroup::with(['courses' => function ($query) {
            ;
        }])->find($courseGroup->id);

        return $courseGroup->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CourseGroup  $courseGroup
     * @return \Illuminate\Http\Response
     */
    public function edit(CourseGroup $courseGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseGroup  $courseGroup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CourseGroup $courseGroup)
    {
        if( $request->input('title') ) $courseGroup->title = $request->input('title');
        if( $request->input('description') ) $courseGroup->description = $request->input('description');
        if( $request->input('vet_package_id') ) $courseGroup->vet_package_id = $request->input('vet_package_id');
        $courseGroup->update();

        return $courseGroup->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseGroup  $courseGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy(CourseGroup $courseGroup)
    {
        $courseGroup->delete();
        return response()->json('Course group deleted!');
    }
}
