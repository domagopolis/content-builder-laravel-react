<?php

namespace App\Observers;

use App\Models\Element;

class ElementObserver
{
    /**
     * Handle the Element "created" event.
     *
     * @param  \App\Models\Element  $element
     * @return void
     */
    public function created(Element $element)
    {
        //
    }

    /**
     * Handle the Element "updated" event.
     *
     * @param  \App\Models\Element  $element
     * @return void
     */
    public function updated(Element $element)
    {
        if($element->order < $element->getOriginal('order')){
            for($i=$element->order; $i<$element->getOriginal('order'); $i++){
                Element::where('id', '!=', $element->id)->where('order', $i)->update(['order' => $i+1]);
            }
        }

        if($element->order > $element->getOriginal('order')){
            for($i=$element->order; $i>$element->getOriginal('order'); $i--){
                Element::where('id', '!=', $element->id)->where('order', $i)->update(['order' => $i-1]);
            }
        }
    }

    /**
     * Handle the Element "deleted" event.
     *
     * @param  \App\Models\Element  $element
     * @return void
     */
    public function deleted(Element $element)
    {
        //
    }

    /**
     * Handle the Element "restored" event.
     *
     * @param  \App\Models\Element  $element
     * @return void
     */
    public function restored(Element $element)
    {
        //
    }

    /**
     * Handle the Element "force deleted" event.
     *
     * @param  \App\Models\Element  $element
     * @return void
     */
    public function forceDeleted(Element $element)
    {
        //
    }
}
