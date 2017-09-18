import {OnInit} from '@angular/core';
import {google} from '@agm/core/services/google-maps-types';
import {D3Helper} from '../../shared/services/d3-helper.service';


export class D3testComponent {


  constructor(private D3: D3Helper) {

  }

  stations_json = {'KMAE': [-120.12, 36.98, 'MADERA MUNICIPAL AIRPORT',
    [26, 1, 2, 5, 6, 3, 2, 1, 2, 7, 29, 12, 3]], 'KSJC': [-121.92, 37.37, 'SAN JOSE INTERNATIONAL  AIRPORT',
    [28, 1, 1, 1, 6, 10, 5, 3, 2, 4, 14, 21, 7]], 'KMCE':[-120.50, 37.28,
    'MERCED MUNICIPAL AIRPORT', [29, 1, 1, 3, 7, 5, 2, 1, 3, 6, 12, 26, 5]],
    'KMER': [-120.57, 37.37, 'Merced / Castle Air Force Base', [34, 1, 1, 1, 4, 5, 2, 1, 1, 4, 17, 22, 7]],
    'KAPC': [-122.28, 38.20, 'NAPA COUNTY AIRPORT', [23, 2, 1, 6, 3, 3, 8, 18, 11, 13, 4, 3, 5]],
    'KSUU': [-121.95, 38.27, 'Fairfield / Travis Air Force Base',[13, 7, 4, 3, 3, 6, 4, 13, 33, 4, 1, 2, 7]],
    'KSQL': [-122.25, 37.52, 'San Carlos Airport', [18, 3, 2, 2, 3, 4, 3, 2, 5, 17, 16, 12, 12]],
    'KSNS': [-121.60, 36.67, 'SALINAS MUNICIPAL AIRPORT', [21,1, 1, 6, 12, 3, 1, 2, 9, 21, 17, 5, 1]],
    'KMOD': [-120.95, 37.62, 'MODESTO CITY CO SHAM FLD', [27, 1, 1, 2, 10, 5, 1, 1, 1, 3, 17, 24, 8]],
    'KOAK': [-122.23, 37.72, 'METRO OAKLAND INTERNATIONAL  AIRPORT ', [16, 3, 3, 2, 4, 6, 3, 4, 9, 23, 20, 6, 2]],
    'KSCK': [-121.23, 37.90, 'STOCKTON METROPOLITAN AIRPORT ', [21, 2, 2, 3, 6, 8, 2, 1, 4, 15, 19, 12, 4]],
    'KCCR': [-122.05, 38.00, 'CONCORD BUCHANAN FIELD', [24, 3, 2, 1, 1, 5, 17, 12, 9, 9, 7, 6, 4]],
    'KMRY': [-121.85, 36.58, 'MONTEREY PENINSULA AIRPORT', [26, 1, 2, 9, 5, 3, 4, 9, 13, 14, 9, 4, 1]],
    'KPAO': [-122.12, 37.47, 'Palo Alto Airport', [31, 3, 1, 1, 2, 5, 1, 1, 1, 4, 10, 25, 14]],
    'KSAC': [-121.50, 38.50, 'SACRAMENTO EXECUTIVE AIRPORT ', [32, 1, 0, 1, 3, 11, 12, 16, 5, 2, 4, 9, 3]],
    'KHWD': [-122.12, 37.67, 'HAYWARD AIR TERMINAL', [20, 2, 7, 2, 2, 6, 3, 3, 6, 23, 18, 6, 2]],
    'KSTS': [-122.82, 38.50, 'SANTA ROSA SONOMA COUNTY', [46, 1, 0, 1, 5, 13, 10, 4, 3, 3, 4, 6, 3]],
    'KSMF': [-121.60, 38.70, 'SACRAMENTO INTERNATIONAL  AIRPORT', [19, 2, 1, 2, 4, 21, 18, 8, 3, 2, 5, 12, 4]],
    'KNUQ': [-122.05, 37.43, 'MOFFETT FIELD', [35, 3, 1, 1, 4, 7, 2, 1, 2, 5, 6, 17, 15]], 'KRHV':[-121.82, 37.33,
      'San Jose / Reid / Hillv',  [35, 0, 0, 1, 4, 4, 2, 1, 1, 10, 28, 11, 1]], 'KWVI':[-121.78, 36.93,
      'WATSONVILLE MUNICIPAL AIRPORT ',  [44, 1, 2, 3, 4, 5, 7, 9, 8, 4, 6, 5, 2]],
    'KMHR': [-121.30, 38.55, 'Sacramento, Sacramento Mather Airport', [21, 1, 1, 2, 8, 15, 12, 12, 7, 4, 5, 7, 3]],
    'KVCB': [-121.95, 38.38, 'VACAVILLE NUT TREE AIRPORT', [36, 2, 1, 1, 2, 6, 10, 18, 10, 2, 2, 5, 6]],
    'KSFO': [-122.37, 37.62, 'SAN FRANCISCO INTERNATIONAL  AIRPORT ', [13, 3, 3, 2, 3, 4, 4, 4, 7, 31, 20, 2, 3]],
    'KLVK': [-121.82, 37.70, 'LIVERMORE MUNICIPAL AIRPORT ', [32, 2, 7, 3, 1, 1, 2, 7, 9, 17, 16, 2, 1]]};

  myData = this.stations_json;



  initMap(): void {
    const overlay = new google.maps.OverlayView();

// Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
      const layer = this.D3.select(this.getPanes().overlayLayer).append('div')
        .attr('class', 'stations');

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function() {
        const projection = this.getProjection(),
          padding = 10;

        const marker = layer.selectAll('svg')
          .data(this.D3.entries(this.myData))
          .each(transform) // update existing markers
          .enter().append('svg:svg')
          .each(transform)
          .attr('class', 'marker');

        // CHART BEGIN

        const w = 500;
        const h = 100;
        const barPadding = 1;

        const dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
          11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

        // Create SVG element
        const svgchart = marker.append('g');

        svgchart.selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('x', function(d, i) {
            return i * (w / dataset.length);
          })
          .attr('y', function(d) {
            return h - (d * 4);
          })
          .attr('width', w / dataset.length - barPadding)
          .attr('height', function(d) {
            return d * 4;
          })
          .attr('fill', function(d) {
            return 'rgb(0, 0, ' + (d * 10) + ')';
          });

        svgchart.selectAll('text')
          .data(dataset)
          .enter()
          .append('text')
          .text(function(d) {
            return d;
          })
          .attr('text-anchor', 'middle')
          .attr('x', function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
          })
          .attr('y', function(d) {
            return h - (d * 4) + 14;
          })
          .attr('font-family', 'sans-serif')
          .attr('font-size', '11px')
          .attr('fill', 'white');

        // Add a circle.
        marker.append('svg:circle')
          .attr('r', 4.5)
          .attr('cx', padding)
          .attr('cy', padding);

        // Add a label.
        marker.append('svg:text')
          .attr('x', padding + 7)
          .attr('y', padding)
          .attr('dy', '.31em')
          .text(function(d) { return d.key; });

        function transform(d) {
          d = new google.maps.LatLng(d.value[1], d.value[0]);
          d = projection.fromLatLngToDivPixel(d);
          return this.D3.select(this)
            .style('left', (d.x - padding) + 'px')
            .style('top', (d.y - padding) + 'px');
        }
      };
    };

  }




}

