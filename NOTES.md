Class `WP_Script_Modules` is defined at [`/wp-includes/class-wp-script-modules.php`](https://github.com/WordPress/wordpress-develop/blob/4d19161cdc4041e858ca69fad1dcca31cabec50b/src/wp-includes/class-wp-script-modules.php)

Script Module functions are defined at [`wp-includes/script-modules.php`](https://github.com/WordPress/wordpress-develop/blob/4d19161cdc4041e858ca69fad1dcca31cabec50b/src/wp-includes/script-modules.php)

---

_`interactivity/index.min.js` & `module1` are preloaded for faster execution_

```js
<link
    rel="modulepreload"
    href="http://localhost:8881/wp-includes/js/dist/script-modules/interactivity/index.min.js?ver=907ea3b2f317a78b7b9b"
    id="@wordpress/interactivity-js-modulepreload">
<link
    rel="modulepreload"
    href="http://localhost:8881/wp-content/plugins/script-modules-custom-webpack/assets/js/module1.js?ver=6.7.2"
    id="module-1-js-modulepreload">
```

_The block's `view.js` file is loaded directly as a module using type="module"_

```js
<script
	type="module"
	src="http://localhost:8881/wp-content/plugins/script-modules-custom-webpack/build/view.js?ver=db75adbd6c401122ef00"
	id="create-block-script-modules-view-view-script-module-js-module"
></script>
```

_Maps module specifiers to actual URLs, allowing clean imports in JavaScript, making it possible to write `import { feature } from 'module-1'` instead of full paths_

```js
<script type="importmap" id="wp-importmap">
	{
		"imports": {
			"@wordpress/interactivity": "http://localhost:8881/wp-includes/js/dist/script-modules/interactivity/index.min.js?ver=907ea3b2f317a78b7b9b",
			"module-1": "http://localhost:8881/wp-content/plugins/script-modules-custom-webpack/assets/js/module1.js?ver=6.7.2",
			"module-2": "http://localhost:8881/wp-content/plugins/script-modules-custom-webpack/assets/js/module2.js?ver=6.7.2",
			"module-3": "http://localhost:8881/wp-content/plugins/script-modules-custom-webpack/assets/js/module3.js?ver=6.7.2"
		}
	}
</script>
```

---

_`plugin.php`_

```php
function create_block_script_modules_view_block_init() {

	$plugin_url = plugin_dir_url( __FILE__ );

	wp_register_script_module( 'module-1', $plugin_url . 'assets/js/module1.js' );
	wp_register_script_module( 'module-2', $plugin_url . 'assets/js/module2.js' );
	wp_register_script_module( 'module-3', $plugin_url . 'assets/js/module3.js' );

	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_script_modules_view_block_init' );

```

`view.js`

```js
/* eslint-disable no-console, import/no-unresolved */
import { store } from "@wordpress/interactivity";
import { moduleOne } from "module-1";

moduleOne();

setTimeout(() => {
	import("module-2")
		.then((module) => {
			const { moduleTwo } = module;
			moduleTwo();
		})
		.catch((error) => {
			console.error("Error loading module-3:", error);
		});
}, 2000);

const { state } = store("script-modules-block-view", {
	state: {
		text: "Hello World",
		clicked: false,
		color: () => (state.clicked ? "red" : "blue"),
	},
	actions: {
		loadModule() {
			console.log("loadModule");
			import("module-3")
				.then((module) => {
					const { moduleThree } = module;
					const value = moduleThree();
					state.text = value;
					state.clicked = true;
				})
				.catch((error) => {
					console.error("Error loading module-3:", error);
				});
		},
	},
});
```
