---
title: Cómo clonar nested relations en Laravel
summary: Un gist muy útil para clonar relaciones anidadas en Laravel.  
date: 2021-03-04 17:00:00
image: fPkvU7RDmCo
tags: [Laravel]
---

Basándome en esta [respuesta de Stackoverflow][1], modifiqué el trait para duplicar de forma recursiva todas las relaciones cargadas en un objeto. 

También añadí la opción para clonar las relaciones de tipo `belongsToMany`.

Esta es la forma final del trait: 

```php
use Illuminate\Database\Eloquent\Collection;

trait DuplicateRelations
{

    public static function duplicateRelations($from, $to)
    {
        foreach ($from->relations as $relationName => $object) {
            if ($object !== null) {
                if ($object instanceof Collection) {
                    foreach ($object as $relation) {
                        self::replication($relationName, $relation, $to);
                    }
                } else {
                    self::replication($relationName, $object, $to);
                }
            }
        }
    }

    private static function replication($name, $relation, $to)
    {
        $newRelation = $relation->replicate();
        if (isset($relation['pivot'])) {
            $to->{$name}()->attach($relation->id);
        } else {
            $newObject = $to->{$name}()->create($newRelation->attributesToArray());
            unset($relation['pivot']);
            if (collect($relation->relations)->isNotEmpty()) {
                self::duplicateRelations($relation, $newObject);
            }
        }
    }
}
```

### ¿Cómo usarlo?

Para usarlo solo tienes que cargar todas las relaciones que quieras clonar, ejemplo:

```php
public function clone()
{
    $object = Model::first();
    $newObject = $object->replicate();
    $newObject->save();

    $object->relations = [];
    $object->load([
        'relation',
        'another_relation.nested_relation',
        'more_relations' => function ($query) {
            $query->with(['one_to_one', 'many_to_many']);
        }
    ]);

    self::duplicateRelations($object, $newObject);
}
```

[1]:	https://stackoverflow.com/a/60233686/6456709 "Clone an Eloquent object including all relationships?"