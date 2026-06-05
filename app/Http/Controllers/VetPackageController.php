<?php

namespace App\Http\Controllers;

use App\Models\VetPackage;
use Illuminate\Http\Request;

class VetPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vet_packages = VetPackage::get();

        return $vet_packages->toJson();
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
        $validatedData = $request->validate(['course_name' => 'required']);

        $vetPackage = VetPackage::create([
          'course_name' => $validatedData['course_name'],
        ]);

        return $vetPackage->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VetPackage  $vetPackage
     * @return \Illuminate\Http\Response
     */
    public function show(VetPackage $vetPackage)
    {
        return $vetPackage->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\VetPackage  $vetPackage
     * @return \Illuminate\Http\Response
     */
    public function edit(VetPackage $vetPackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VetPackage  $vetPackage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VetPackage $vetPackage)
    {
        if( $request->input('course_name') ) $vetPackage->course_name = $request->input('course_name');
        $vetPackage->update();

        return $vetPackage->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VetPackage  $vetPackage
     * @return \Illuminate\Http\Response
     */
    public function destroy(VetPackage $vetPackage)
    {
        $vetPackage->delete();
        return response()->json('Vet package deleted!');
    }
}
