<template>
  <div class="container">
    <!-- TODO localhost fixen -->
    <iframe
      :src="getHostname()"
      scrolling="yes"
      frameborder="0"
      height="800"
      style="width: 0; min-width: 100% !important;"></iframe>
  </div>
</template>

<script>
export default {
  methods: {
    getHostname: function() {
        console.log("Getting hostname to build iframe url...")
        var ip = location.host;
        var es_url = "http://" + ip + "/kibana_dashboard/app/kibana#/dashboard/1bb81ee0-311f-11ea-865c-53e4de13d3ef?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(isLayerTOCOpen:!f,mapCenter:(lat:51.83014,lon:11.09763,zoom:4.71),openTOCDetails:!()),gridData:(h:20,i:c4dff27d-f075-4537-ab57-3b332ee43002,w:24,x:0,y:0),id:'34530e00-3832-11ea-8303-fb3f44efe4d7',panelIndex:c4dff27d-f075-4537-ab57-3b332ee43002,type:map,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'73b640c5-8dc6-4c9a-91ea-20bdb9396247',w:24,x:24,y:0),id:f343ebe0-382d-11ea-8303-fb3f44efe4d7,panelIndex:'73b640c5-8dc6-4c9a-91ea-20bdb9396247',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'019e1414-824b-416b-a0d1-e2150d5a7c20',w:24,x:24,y:15),id:'3694bd70-382e-11ea-8303-fb3f44efe4d7',panelIndex:'019e1414-824b-416b-a0d1-e2150d5a7c20',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:a8d69c17-9504-4d08-b60f-92f0a0582ea6,w:24,x:0,y:20),id:d602e860-382d-11ea-8303-fb3f44efe4d7,panelIndex:a8d69c17-9504-4d08-b60f-92f0a0582ea6,type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'4b48372b-1974-4ec3-9c95-56dff60398c1',w:24,x:24,y:45),id:'8d130860-382d-11ea-8303-fb3f44efe4d7',panelIndex:'4b48372b-1974-4ec3-9c95-56dff60398c1',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'18011155-b91f-4ace-bddd-c64b2a6cb547',w:24,x:24,y:30),id:'6a098000-382e-11ea-8303-fb3f44efe4d7',panelIndex:'18011155-b91f-4ace-bddd-c64b2a6cb547',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'9ad6b189-5adc-44f8-adc4-7d89cc31d438',w:24,x:0,y:35),id:'54581050-382e-11ea-8303-fb3f44efe4d7',panelIndex:'9ad6b189-5adc-44f8-adc4-7d89cc31d438',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:f3e7bae2-bd42-4bdd-9ceb-7c4fe17037dc,w:24,x:0,y:50),id:'0e7d86a0-382e-11ea-8303-fb3f44efe4d7',panelIndex:f3e7bae2-bd42-4bdd-9ceb-7c4fe17037dc,type:visualization,version:'7.4.2')),query:(language:kuery,query:''),timeRestore:!f,title:hoou_oer_dashboard,viewMode:view)"
        console.log(es_url);
        return es_url;
    }
  },
}
</script>