<template>
  <section class="px-10 pb-5">
    <b-collapse
      class="card"
      animation="rotate"
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">{{ collapse.title }}</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <ul>
            <li v-for="(item, index) in collapse.list" :key="index">{{ item }}</li>
          </ul>
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
						'¿Por qué usar Laravel?',
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
            'Directorios principales',
            'Archivos importantes',
            'La Configuración de Laravel',
            'Personalización de Bulma',
            'Conclusión '
          ]
        },
        {
					title: 'Capítulo 4 - El camino con Laravel y Bulma',
					list: [
            'Introducción al proyecto del libro',
            'El patrón de diseño MVC',
            'Enrutamiento',
          ]
				}
			]
		}
	}
}
</script>
