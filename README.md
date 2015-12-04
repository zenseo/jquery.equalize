# jQuery.Equalize

An easy way to achieve equally high sets of content boxes regardless of the length of their content. This plugins supports responsive layouts and breakpoints.

## Settings (defaults)

- '$window' - the parent resizing element, in most cases the window ($(window))
- 'responsive' - recalculate on resize (true)
- 'attribute' - in rare cases 'min-height' is the better option ('height')
- 'breakpoints' - the breakpoint threshold shortcodes ({'md': 1200, 'sm': 992, 'xs': 768})

## Methods

- $el.equalize('applySettings', [object]): Apply new settings. They will be merged with the default settings, not the previous settings.
- $el.equalize('off'): Unbind the plugin.

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

Breakpoints can be used to disable the plugin at a certain minimal window (as defined in the settings) width. Use the three predefined breakpoints if you work with Bootstrap grids or define your own breakpoints for more flexibility.

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
	$('#set_2').equalize({ 'breakpoints': { 'my-breakpoint': 360 } });
</script>
```

### Resize Sub-Elements

Instead of resizing the whole element you can also define a sub-element that will be resized instead to achive equal heights. This helps to solve problems with more complex layouts and padding or margin issues. You can also define more than one linked element although this can lead to undesired results.

```html
<div id="set">
	<div class="box" data-equalize-link=".content-wrapper">
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

### Ignore Child Elements

To exclude child elements from height changes add the 'equalize-ignore' data attribute.

```html
<div id="set">
	<h1 data-equalize-ignore>Headline</h1>

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
