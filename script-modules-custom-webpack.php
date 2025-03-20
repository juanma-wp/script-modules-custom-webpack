<?php
/**
 * Plugin Name:       Script Modules Custom Webpack
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       script-modules-custom-webpack
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function create_block_script_modules_custom_webpack_block_init() {
	register_block_type( __DIR__ . "/build/" );
}
add_action( 'init', 'create_block_script_modules_custom_webpack_block_init' );
