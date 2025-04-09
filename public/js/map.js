// console.log(MAP_TOKEN);
console.log(coordinates);
// console.log(coordinates[0]);
// console.log(coordinates[1]);
// console.log(listing);
mapboxgl.accessToken = MAP_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [coordinates[0],coordinates[1]], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 11
    });

    // 18.963360
    // 78.526644
    // console.log(coordinates);

    const Marker = new mapboxgl.Marker({color:"red"}).setLngLat(coordinates).
    setPopup(new mapboxgl.Popup({offset:25})
    .setHTML(`<h3>${listing.title}</h3><p>Exact location will be provided after booking</P>`)
    .setMaxWidth("700px")).addTo(map); 


    map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage('cat', image);

                // Add a data source containing one point feature.
                map.addSource(`+`);
            }
        )
    }
    )


   
//         // Create a DOM element for each marker.
//         const el = document.createElement('div');
       
//         el.className = 'marker';
//         el.style.backgroundImage = `url(https://tse3.mm.bing.net/th?id=OIP.E-DeSAJpL19jaMJNVWU0LgAAAA&pid=Api&P=0&h=180)`;
//         el.style.width = '40px';
//         el.style.height = `40px`;
//         el.style.backgroundSize = '100%';
//         el.style.borderRadius = '50%'; // Makes it circular
// el.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Adds shadow
// el.style.border = '2px solid white'; // Adds border

//         el.addEventListener('click', () => {
//             window.alert("Welcome");
//         });

      
//         new mapboxgl.Marker(el)
//             .setLngLat(coordinates)
//             .addTo(map);
    
    
      