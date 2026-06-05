<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $courses = Course::get();

        return $courses->toJson();
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

        $course = Course::create([
          'title' => $validatedData['title'],
          'description' => $request->description,
          'duration' => $request->duration,
          'vet_package_id' => $request->vet_package_id,
          'course_group_id' => $request->course_group_id,
        ]);

        return $course->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        $course = Course::with(['course_units' => function ($query) {
            $query->orderBy('order');
        }])->find($course->id);

        return $course->toJson();
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
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        if( $request->input('title') !== NULL ) $course->title = $request->input('title');
        if( $request->input('description') !== NULL ) $course->description = $request->input('description');
        if( $request->input('duration') !== NULL ) $course->duration = $request->input('duration');
        if( $request->input('vet_package_id') !== NULL ) $course->vet_package_id = $request->input('vet_package_id');
        if( $request->input('course_group_id') !== NULL ) $course->course_group_id = $request->input('course_group_id');
        $course->update();

        return $course->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json('Course deleted!');
    }
}
