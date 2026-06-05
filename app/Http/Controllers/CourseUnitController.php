<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseUnit;

class CourseUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $course_units = CourseUnit::get();

        return $course_units->toJson();
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
        $validatedData = $request->validate(['course_id' => 'required', 'unit_id' => 'required']);

        $course_unit = CourseUnit::where('course_id', $validatedData['course_id'])->orderBy('order', 'desc')->first();

        $order = ($course_unit)?$course_unit['order']:0;

        $course_unit = CourseUnit::create([
          'course_id' => $validatedData['course_id'],
          'unit_id' => $validatedData['unit_id'],
          'order' => $order+1,
        ]);

        $course_unit = CourseUnit::find($course_unit->id);

        return $course_unit->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CourseUnit  $courseUnit
     * @return \Illuminate\Http\Response
     */
    public function show(CourseUnit $courseUnit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CourseUnit  $courseUnit
     * @return \Illuminate\Http\Response
     */
    public function edit(CourseUnit $courseUnit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CourseUnit  $courseUnit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CourseUnit $courseUnit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CourseUnit  $courseUnit
     * @return \Illuminate\Http\Response
     */
    public function destroy(CourseUnit $courseUnit)
    {
        $courseUnit->delete();
        return response()->json('Course Unit deleted!');
    }
}
