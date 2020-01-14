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
        var es_url = "http://" + ip + "/kibana_dashboard/app/kibana#/dashboard/1bb81ee0-311f-11ea-865c-53e4de13d3ef?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(legendOpen:!f,vis:(legendOpen:!t)),gridData:(h:15,i:'22df7a53-db96-4be0-9b68-ae38ef8c7119',w:24,x:0,y:0),id:'7f8c1e40-312d-11ea-865c-53e4de13d3ef',panelIndex:'22df7a53-db96-4be0-9b68-ae38ef8c7119',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:b327fe67-4041-4507-b02c-5dd58f9753f6,w:24,x:24,y:0),id:'17c797e0-360e-11ea-9115-997bc98953b4',panelIndex:b327fe67-4041-4507-b02c-5dd58f9753f6,type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:b2dbbcbe-8fdf-42eb-a611-2e447d5fd165,w:24,x:0,y:15),id:c56d13c0-3613-11ea-9b25-1323c6d84079,panelIndex:b2dbbcbe-8fdf-42eb-a611-2e447d5fd165,type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'1ea62f04-42fe-4eb5-ab0c-bef25f03375f',w:24,x:24,y:30),id:af29eb60-3613-11ea-9b25-1323c6d84079,panelIndex:'1ea62f04-42fe-4eb5-ab0c-bef25f03375f',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'6633877a-e124-4185-b3be-a6a8f777b44a',w:24,x:0,y:30),id:'98ad1560-3613-11ea-9b25-1323c6d84079',panelIndex:'6633877a-e124-4185-b3be-a6a8f777b44a',type:visualization,version:'7.4.2'),(embeddableConfig:(),gridData:(h:15,i:'52f28978-d041-4d05-a209-64fe46629d2c',w:24,x:24,y:15),id:dd35a3a0-3613-11ea-9b25-1323c6d84079,panelIndex:'52f28978-d041-4d05-a209-64fe46629d2c',type:visualization,version:'7.4.2')),query:(language:kuery,query:''),timeRestore:!f,title:hoou_dashboard,viewMode:view)";
        console.log(es_url);
        return es_url;
    }
  },
}
</script>