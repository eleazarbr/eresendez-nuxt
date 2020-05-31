<template>
  <section class="px-10 pb-5">
    <b-collapse
      class="card"
      animation="none"
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <div class="card-header-title">{{ collapse.title }}</div>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div>
          <ol class="is-lower-roman" style="margin-top: 0;">
            <li v-for="(item, index) in collapse.list" :key="index">{{ item }}</li>
          </ol>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
	name: 'BookOutline',

	data() {
		return {
			isOpen: 0,
			collapses: [
				{
					title: 'Capítulo 1 - Introducción',
					list: [
						'PHP en la actualidad',
						'¿Por qué Laravel y Bulma?',
						'¡Hola, Mundo!',
						'Bulma CSS',
						'Conclusión'
					]
				},
				{
					title: 'Capítulo 2 - Cómo configurar tu primer proyecto',
					list: [
						'Los requerimientos del sistema',
						'Composer',
						'Instalación de Laravel y Bulma',
						'Conclusión'
					]
				},
				{
					title: 'Capítulo 3 - La estructura de archivos en Laravel y Bulma',
					list: [
						'Los directorios principales',
						'Los archivos más importantes',
						'La Configuración de Laravel',
						'Cómo personalizar Bulma',
						'Conclusión '
					]
				},
				{
					title: 'Capítulo 4 - El camino con Laravel y Bulma',
					list: [
						'Introducción al proyecto del libro',
						'El patrón de diseño MVC',
						'Enrutamiento (definición de rutas, grupos, namespaces, prefijos, rutas firmadas)',
						'Controladores (inyección de dependencias, resource, api resource)',
						'Vistas (Laravel Blade, Laravel Mix, paginación, Lozalication)',
						'Bases de datos y Eloquent (configuración, seeders, migrations, query builder)',
						'Artisan y Tinker',
						'Collections'
					]
				},
				{
					title: 'Bonos',
					list: [
						'TailwindCSS',
						'Laravel Livewire',
						'Jigsaw - Static Sites',
						'AlpineJS'
					]
				}
			]
		}
	}
}
</script>
