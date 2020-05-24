<template>
	<div>
		<div class="a2a_kit a2a_kit_size_32 a2a_default_style">
			<a class="a2a_button_facebook"></a>
			<a class="a2a_button_twitter"></a>
			<a class="a2a_button_linkedin"></a>
			<a class="a2a_button_whatsapp"></a>
			<a class="a2a_dd" href="https://www.addtoany.com/share"></a>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddtoAny",

	created() {
		let addToAnyScript = document.createElement("script");
		addToAnyScript.setAttribute(
			"src",
			"https://static.addtoany.com/menu/page.js"
		);
		addToAnyScript.async = true;
		document.head.appendChild(addToAnyScript);
	}
};
</script>
