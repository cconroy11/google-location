<?php

// WP_Query arguments
$args = array(
	'post_type'              => array( 'locations' ),
	'post_status'            => array( 'publish' ),
	'posts_per_page'         => '-1',
);

// The Query
$query = new WP_Query( $args );

$county_array = [];


// The Loop
if ( $query->have_posts() ) {
	while ( $query->have_posts() ) {
		$query->the_post();

		
		$permalink = get_permalink();

		if( have_rows('attached_counties') ):

		 	// loop through the rows of data
		    while ( have_rows('attached_counties') ) : the_row();

		        // display a sub field value
		        $county_name = get_sub_field('county_name');

		        $county_array[] = ['county' => $county_name, 'url' => $permalink];

		    endwhile;

		endif;



	}
} else {
	// no posts found
}

// Restore original Post Data
wp_reset_postdata();

$json_county_array = json_encode($county_array);

wp_localize_script( 'JS SCRIPT NAME', 'county_array', $json_county_array );