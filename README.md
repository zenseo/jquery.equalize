# jQuery.Equalizer

An easy way to achieve equaly tall sets of content boxes regardless the length of their content. This plugins supports responsive layouts and breakpoints.

## Settings (defaults)

- '$window' - the parent resizing element, in most cases the window ($(window))
- 'responsive' - recalculate on resize (true)
- 'attribute' - in rare cases 'min-height' is the better option (height)
- 'breakpoints' - the breakpoint threshold shortcodes ({'md': 1200, 'sm': 992, 'xs': 768})

## Methods

$el.equalize('applySettings', [object]): Apply new settings. They will be merged with the default settings, not the previous settings.
$el.equalize('off'): Unbind the plugin.

## Examples

### Basic Usage

This is the most simple way to use jQuery.Equalize.

```html
<div id="set">
	<div class="box">
		Some content.
	</div>

	<div class="box">
		A bit more content.
	</div>
</div>
```

```html
<script>
	$('#set').equalize();
</script>
```

### Breakpoints

Breakpoints can be used to disable the plugin at a certain mininmal window (as defined in the settings) width. There are three predefined breakpoints for Bootstrap, set your own shortcodes for more flexibility.

```html
<div id="set" data-equalize-breakpoint="sm">
	<div class="box">
		Some content.
	</div>

	<div class="box">
		A bit more content.
	</div>
</div>

<div id="set_2" data-equalize-breakpoint="my-breakpoint">
	<div class="box">
		Some content.
	</div>

	<div class="box">
		A bit more content.
	</div>
</div>
```

```html
<script>
	$('#set').equalize();
	$('#set_2').equalize({ 'breakpoints': { 'my-breakpoint', 360 } });
</script>
```

### Linked Sub-Elements

Instead of resizing the whole child element you can also define a linked sub-element that will be resized instead. This helps to solve problems with more complex layouts and cross browser issues. You can also define more than one linked element although this can lead to undesired results.

```html
<div id="set">
	<div class="box" data-equalize-link=".inner-wrapper">
		<div class="content-wrapper">
			Some content.
		</div>
	</div>

	<div class="box" data-equalize-link="#inner-content-box">
		<div id="inner-content-box">
				A bit more content.
		</div>
	</div>
</div>
```

```html
<script>
	$('#set').equalize();
</script>
```