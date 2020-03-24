<template>
  <b-container>
    <h1>Eintrag zu "Mein Index" hinzufügen</h1>
    <b-card align="left">
      <b-form-group>

        <b-form-group>
          <b-form-checkbox
        v-model="show_extended_view"
        switch
        >
        Zeig mir alle Metadaten-Optionen!
          </b-form-checkbox>
        </b-form-group>

        <template>
          <b-form-group>
          <label for="name">Titel
              <font-awesome-icon 
              v-b-popover.hover.html="popover.name"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="name" v-model="entry.name"></b-form-input>
          </b-form-group>
        </template>

          <b-form-group>
            <label for="about">Beschreibung 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.about"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-textarea 
              id="about"
              placeholder="Eine Beschreibung des Eintrags..."
              rows="3"
              v-model="entry.about"></b-form-textarea>
          </b-form-group>

          <b-form-group
            label="Url:"
            label-for="url"
            >
            <b-form-input id="url" v-model="entry.url"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Lizenz"
            label-for="license">
            <b-form-select id="license" v-model="entry.license" :options="licenseOptions" size="sm" class="mt-3"></b-form-select>
          </b-form-group>

          <b-form-group>
            <label for="author">Autor:in  
              <font-awesome-icon 
              v-b-popover.hover.html="popover.author"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="author" v-model="entry.author"></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="publisher">Herausgeber:in 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.publisher"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="publisher" v-model="entry.publisher"></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="inLanguage">Sprache des Materials 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.inLanguage"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="inLanguage" v-model="entry.inLanguage"></b-form-input>
          </b-form-group>

        <div  v-if="show_extended_view">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-aapi variant="light">accessibilityAPI 
                <font-awesome-icon 
                v-b-popover.hover.html="popover.accessibilityAPI"
                title="Popover Title"
                :icon="InfoIconSolid"/> 
                <font-awesome-icon :icon="AngleDownIcon"/>
                </b-button>
            </b-card-header>
            <b-collapse id="accordion-aapi" accordion="my-accordion-aapi" role="tabpanel">
              <b-card-body>
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-aapi"
                    v-model="entry.accessibilityAPI"
                    :options="accessibilityAPIOptions"
                    name="accessibilityControl"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-ac variant="light">accessibilityControl
                <font-awesome-icon 
                v-b-popover.hover.html="popover.accessibilityControl"
                title="Popover Title"
                :icon="InfoIconSolid"/> 
                <font-awesome-icon :icon="AngleDownIcon"/></b-button>
            </b-card-header>
            <b-collapse id="accordion-ac" accordion="my-accordion-ac" role="tabpanel">
              <b-card-body>
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-ac"
                    v-model="entry.accessibilityControl"
                    :options="accessibilityControlOptions"
                    name="accessibilityControl"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-af variant="light">accessibilityFeature
                <font-awesome-icon 
                v-b-popover.hover.html="popover.accessibilityFeature"
                title="Popover Title"
                :icon="InfoIconSolid"/> 
                <font-awesome-icon :icon="AngleDownIcon"/></b-button>
            </b-card-header>
            <b-collapse id="accordion-af" accordion="my-accordion-af" role="tabpanel">
              <b-card-body>
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-af"
                    v-model="entry.accessibilityFeature"
                    :options="accessibilityFeatureOptions"
                    name="accessibilityFeature"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-ah variant="light">accessibilityHazard 
                <font-awesome-icon 
                v-b-popover.hover.html="popover.accessibilityHazard"
                title="Popover Title"
                :icon="InfoIconSolid"/> 
                <font-awesome-icon :icon="AngleDownIcon"/></b-button>
            </b-card-header>
            <b-collapse id="accordion-ah" accordion="my-accordion-ah" role="tabpanel">
              <b-card-body>
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-ah"
                    v-model="entry.accessibilityHazard"
                    :options="accessibilityHazardOptions"
                    name="accessibilityHazard"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

<!-- TODO must be put in right format --> 
          <b-form-group>
            <label for="author">Dauer  
              <font-awesome-icon 
              v-b-popover.hover.html="popover.timeRequired"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="timeRequired" v-model="entry.timeRequired"></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="author">Zielgruppe (educationalRole)
              <font-awesome-icon 
              v-b-popover.hover.html="popover.educationalRole"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
               <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-er"
                    v-model="entry.educationalRole"
                    :options="educationalRoleOptions"
                    name="educationalRole"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
          </b-form-group>

          <hr>
<!-- Educational Alignment -->
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-ea variant="light">Educational Alignment (Bildungsausrichtung)
                <font-awesome-icon 
                v-b-popover.hover.html="popover.educationalAlignment"
                title="Popover Title"
                :icon="InfoIconSolid"/>
                <font-awesome-icon :icon="AngleDownIcon"/></b-button>
            </b-card-header>
            <b-collapse id="accordion-ea" accordion="my-accordion-ea" role="tabpanel">
              <b-card-body>
                
                <b-form-group>
                  <label for="alignmentType">Ausrichtungstyp (alignmentType) 
                    <font-awesome-icon 
                    v-b-popover.hover.html="popover.alignmentType"
                    title="Popover Title"
                    :icon="InfoIconSolid"/>
                    </label>
                    <b-form-group>
                      <b-form-checkbox-group
                        id="checkbox-group-at"
                        v-model="entry.alignmentType"
                        :options="alignmentTypeOptions"
                        name="alignmentType"
                        stacked
                      ></b-form-checkbox-group>
                    </b-form-group>
                </b-form-group>
              
                <b-form-group>
                  <label for="educationalFramework">Bildungsrahmen (educationalFramework)
                    <font-awesome-icon 
                    v-b-popover.hover.html="popover.educationalFramework"
                    title="Popover Title"
                    :icon="InfoIconSolid"/>
                    </label>
                  <b-form-input id="educationalFramework" v-model="entry.educationalFramework"></b-form-input>
                </b-form-group>
              
                <b-form-group>
                  <label for="targetDescription">Ziel Beschreibung (targetDescription)
                    <font-awesome-icon 
                    v-b-popover.hover.html="popover.targetDescription"
                    title="Popover Title"
                    :icon="InfoIconSolid"/>
                    </label>
                  <b-form-input id="targetDescription" v-model="entry.targetDescription"></b-form-input>
                </b-form-group>
              
                <b-form-group>
                  <label for="targetName">Ziel Name (targetName)
                    <font-awesome-icon 
                    v-b-popover.hover.html="popover.targetName"
                    title="Popover Title"
                    :icon="InfoIconSolid"/>
                  </label>
                  <b-form-input id="targetName" v-model="entry.targetName"></b-form-input>
                </b-form-group>
              
                <b-form-group>
                  <label for="targetURL">Ziel Name (targetURL)
                    <font-awesome-icon 
                    v-b-popover.hover.html="popover.targetURL"
                    title="Popover Title"
                    :icon="InfoIconSolid"/>
                  </label>
                  <b-form-input id="targetURL" v-model="entry.targetURL"></b-form-input>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-es variant="light">Lerntyp (educationalUse)
                <font-awesome-icon 
                v-b-popover.hover.html="popover.educationalUse"
                title="Popover Title"
                :icon="InfoIconSolid"/>
                <font-awesome-icon :icon="AngleDownIcon"/></b-button>
            </b-card-header>
            <b-collapse id="accordion-es" accordion="my-accordion-es" role="tabpanel">
              <b-card-body>
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-es"
                    v-model="entry.educationalUse"
                    :options="educationalUseOptions"
                    name="accessibilityHazard"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-form-group>
            <label for="typicalAgeRange">Altersgruppe 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.typicalAgeRange"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="typicalAgeRange" v-model="entry.typicalAgeRange"></b-form-input>
          </b-form-group>

          <b-form-group>
            <label for="interactivityType">Interaktivität 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.interactivityType"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-checkbox-group
                    id="checkbox-group-it"
                    v-model="entry.interactivityType"
                    :options="interactivityTypeOptions"
                    name="interactivityType"
                    stacked
                  ></b-form-checkbox-group>
          </b-form-group>

          <b-form-group>
            <label for="learningResourceType">Art der Lernressource 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.learningResourceType"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-select id="learningResourceType" v-model="entry.learningResourceType" :options="learningResourceTypeOptions" size="sm" class="mt-3"></b-form-select>
          </b-form-group>

          <b-form-group>
            <label for="isBasedOnUrl">Basierend auf Lernressource 
              <font-awesome-icon 
              v-b-popover.hover.html="popover.isBasedOnUrl"
              title="Popover Title"
              :icon="InfoIconSolid"/>
              </label>
            <b-form-input id="isBasedOnUrl" v-model="entry.isBasedOnUrl"></b-form-input>
          </b-form-group>

          <hr>

        </b-form-group>
    <hr>

    <p>Titel: {{entry.name}}</p>
    <p style="white-space: pre">Beschreibung: {{entry.about}}</p>
    <p>Url: {{entry.url}}</p>
    <div class="mt-3">Lizenz: {{ entry.license }}</div>

    <b-row>
      <b-col>
        <button @click="postData">URL zu Index "Mein Index" hinzufügen</button>
      </b-col>
      <b-col>
        <button @click="logEntry">Log Entry</button>
      </b-col>
      <b-col>
        <button @click="buildJsonLd">Build Json-Ld/button</button>
      </b-col>
    </b-row>
  </b-card>

  <b-card>
   <div>
    <b-form-textarea 
      id="textarea-lrmi"
      rows="20"
      plaintext :value="lrmi_text"></b-form-textarea>
  </div>
</b-card>
  </b-container>
</template>

<script>
import apiClient from '../../axios';

import { faInfoCircle as fasInfo } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown as fasAngleDown } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      entry: {
        name: null,
        about: null,
        author: null,
        publisher: null,
        inLanguage: null,
        accessibilityAPI: null,
        accessibilityControl: null,
        accessibilityFeature: null,
        accessibilityHazard: null,
        license: null,
        timeRequired: null,
        educationalRole: null,
        alignmentType: null,
        educationalFramework: null,
        targetDescription: null,
        targetName: null,
        targetURL: null,
        educationalUse: null,
        typicalAgeRange: null,
        interactivityType: null,
        learningResourceType: null,
        isBasedOnUrl: null,
        url: null,
        thumbnail : '',
        tags : '',
        project : '',
        source : 'Mein Index',
        spider : '',
        // TODO insert current date in correct format
        date_scraped : null,
      },
      popover : {
        name: 'Ein eindeutiger Name, um das Material aufzufinden. <br> <a target="_blank" href="https://schema.org/name">Definition </a> auf Schema.org',
        about: 'Eine Beschreibung, die den Menschen hilft, den Zweck des Materials zu verstehen. <br> <a target="_blank" href="https://schema.org/about">Definition </a> auf Schema.org',
        author: 'Name der Person oder Organisation, die das Material erstellt hat. <br> <a target="_blank" href="https://schema.org/author">Definition </a> auf Schema.org',
        publisher: 'Name der Person oder Organisation, die das Material herausgegeben hat. <br> <a target="_blank" href="https://schema.org/publisher">Definition </a> auf Schema.org',
        inLanguage: 'Die Sprache in der das Material verfasst ist. <br> <a target="_blank" href="https://schema.org/inLanguage">Definition </a> auf Schema.org',
        accessibilityAPI: 'Indicates that the resource is compatible with the referenced accessibility API. <br> <a target="_blank" href="https://schema.org/accessibilityAPI">Definition </a> auf Schema.org',
        accessibilityControl: 'Identifies input methods that are sufficient to fully control the described resource. <br> <a target="_blank" href="https://schema.org/accessibilityControl">Definition </a> auf Schema.org',
        accessibilityFeature: 'Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility. <br> <a target="_blank" href="https://schema.org/accessibilityFeature">Definition </a> auf Schema.org',
        accessibilityHazard: 'A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3. <br> <a target="_blank" href="https://schema.org/accessibilityHazard">Definition </a> auf Schema.org',
        timeRequired: 'Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience. <br> <a target="_blank" href="https://schema.org/timeRequired">Definition </a> auf Schema.org',
        educationalRole: 'The role that describes the target audience of the content. Note: schema.org/EducationalAudience is a subtype of Schema.org/Audience. <br> <a target="_blank" href="https://schema.org/educationalRole">Definition </a> auf Schema.org <br> <a target="_blank" href="https://www.dublincore.org/specifications/lrmi/concept_schemes/#educational-audience-role" >Definition</a> des Vokabulars. ',
        educationalAlignment: 'An alignment to an established educational framework. <br> <a target="_blank" href="https://schema.org/educationalAlignment">Definition </a> auf Schema.org',
        alignmentType: 'A category of alignment between the learning resource and the framework node. Recommended values include: "assesses", "teaches", "requires", "textComplexity", "readingLevel", "educationalSubject", and "educationalLevel". <br> <a target="_blank" href="https://schema.org/educationalAlignment">Definition </a> auf Schema.org',
        educationalFramework: 'The framework to which the resource being described is aligned. <br> <a target="_blank" href="https://schema.org/educationalFramework">Definition </a> auf Schema.org',
        targetDescription: 'The description of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetDescription">Definition </a> auf Schema.org',
        targetName: 'The name of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetName">Definition </a> auf Schema.org',
        targetURL: 'The URL of a node in an established educational framework. <br> <a target="_blank" href="https://schema.org/targetURL">Definition </a> auf Schema.org',
        educationalUse: 'The purpose of a work in the context of education; for example, "assignment", "group work". <br> <a target="_blank" href="https://schema.org/educationalUse">Definition </a> auf Schema.org',
        typicalAgeRange: 'The typical expected age range, e.g. "7-9", "11-". <br> <a target="_blank" href="https://schema.org/typicalAgeRange">Definition </a> auf Schema.org',
        interactivityType: 'The predominant mode of learning supported by the learning resource. Acceptable values are "active", "expositive", or "mixed". <br> <a target="_blank" href="https://schema.org/interactivityType">Definition </a> auf Schema.org',
        learningResourceType: 'The predominant type or kind characterizing the learning resource. For example, "presentation", "handout". <br> <a target="_blank" href="https://schema.org/learningResourceType">Definition </a> auf Schema.org',
        isBasedOnUrl: 'A resource that was used in the creation of this resource. This term can be repeated for multiple sources. For example, http://example.com/great-multiplication-intro.html. <br> <a target="_blank" href="https://schema.org/isBasedOnUrl">Definition </a> auf Schema.org'
      },
      accessibilityAPIOptions: [
        { value: 'AndroidAccessibility', text: 'AndroidAccessibility'},
        { value: 'ARIA', text: 'ARIA' },
        { value: 'ATK', text: 'ATK' },
        { value: 'AT-SPI', text: 'AT-SPI' },
        { value: 'BlackberryAccessibility', text: 'BlackberryAccessibility' },
        { value: 'iAccessible2', text: 'iAccessible2' },
        { value: 'iOSAccessibility', text: 'iOSAccessibility' },
        { value: 'JavaAccessibility', text: 'JavaAccessibility' },
        { value: 'MacOSXAccessibility', text: 'MacOSXAccessibility' },
        { value: 'MSAA', text: 'MSAA' },
        { value: 'UIAutomation', text: 'UIAutomation' },
      ],
      accessibilityControlOptions: [
        { value: 'Full Keyboard Control', text: 'Full Keyboard Control'},
        { value: 'Full Mouse Control', text: 'Full Mouse Control'},
        { value: 'Full Switch Control', text: 'Full Switch Control'},
        { value: 'Full Touch Control', text: 'Full Touch Control'},
        { value: 'Full Video Control', text: 'Full Video Control'},
        { value: 'Full Voice Control', text: 'Full Voice Control'},
      ],
      accessibilityFeatureOptions: [
        { value: 'alternativeText', text: 'alternativeText' },
        { value: 'annotations', text: 'annotations' },
        { value: 'audioDescription', text: 'audioDescription' },
        { value: 'bookmarks', text: 'bookmarks' },
        { value: 'braille', text: 'braille' },
        { value: 'captions', text: 'captions' },
        { value: 'ChemML', text: 'ChemML' },
        { value: 'describedMath', text: 'describedMath' },
        { value: 'displayTransformability', text: 'displayTransformability' },
        { value: 'highContrastAudio', text: 'highContrastAudio' },
        { value: 'highContrastDisplay', text: 'highContrastDisplay' },
        { value: 'index', text: 'index' },
        { value: 'largePrint', text: 'largePrint' },
        { value: 'latex', text: 'latex' },
        { value: 'longDescription', text: 'longDescription' },
        { value: 'MathML', text: 'MathML' },
        { value: 'none', text: 'none' },
        { value: 'printPageNumbers', text: 'printPageNumbers' },
        { value: 'readingOrder', text: 'readingOrder' },
        { value: 'rubyAnnotations', text: 'rubyAnnotations' },
        { value: 'signLanguage', text: 'signLanguage' },
        { value: 'structuralNavigation', text: 'structuralNavigation' },
        { value: 'synchronizedAudioText', text: 'synchronizedAudioText' },
        { value: 'tableOfContents', text: 'tableOfContents' },
        { value: 'taggedPDF', text: 'taggedPDF' },
        { value: 'tactileGraphic', text: 'tactileGraphic' },
        { value: 'tactileObject', text: 'tactileObject' },
        { value: 'timingControl', text: 'timingControl' },
        { value: 'transcript', text: 'transcript' },
        { value: 'ttsMarkup', text: 'ttsMarkup' },
        { value: 'unlocked', text: 'unlocked' },
      ],
      accessibilityHazardOptions: [
        { value: 'flashing', text: 'flashing' },
        { value: 'noFlashingHazard', text: 'noFlashingHazard' },
        { value: 'motionSimulation', text: 'motionSimulation' },
        { value: 'noMotionSimulationHazard', text: 'noMotionSimulationHazard' },
        { value: 'sound', text: 'sound' },
        { value: 'noSoundHazard', text: 'noSoundHazard' },
        { value: 'unknown', text: 'unknown' },
        {value: 'none', text: 'none' }
      ],
      alignmentTypeOptions: [],
      educationalUseOptions: [],
      interactivityTypeOptions: [],
      educationalRoleOptions: [],
      learningResourceTypeOptions: [
        { value: null, text: 'Bitte einen Ressource-Typen auswählen'},
        { value: 'h5p', text: 'H5P'},
        { value: 'video', text: 'Video'},
        { value: 'worksheet', text: 'Arbeitsblatt'},
      ],
      licenseOptions: [
        { value: null, text: 'Bitte eine Lizenz auswählen' },
        { value: 'CC 0', text: 'CC 0' },
        { value: 'CC BY', text: 'CC BY' },
        { value: 'CC BY-SA', text: 'CC BY-SA' },
        { value: 'CC BY-SA-NC', text: 'CC BY-SA-NC' },
        { value: 'CC BY-ND', text: 'CC BY-ND' },
      ],
      lrmi_text: "Your JSON-LD will be build here.",
      show_extended_view: false,
    }
  },
  computed: {
    InfoIconSolid () {
      return fasInfo
    },
    AngleDownIcon () {
      return fasAngleDown
    },
  },
  methods: {
    logEntry: function() {
      console.log(this.entry);
    },
// TODO add feature to input number of indents in function
    buildString(selected) {
      var input_string = '"null"'
      if (selected == null) {
        return input_string
      } else if (selected.length == 0) {
        return input_string
      } else if (selected.length == 1) {
        input_string = '"' + selected + '"';
        return input_string
      } else {
        input_string = '[ \n \t \t \t'
        selected.forEach(e => {
        var str = '"' + e + '"\n \t \t \t';
        input_string += str 
        })
        input_string += ']'
        return input_string
      }
    },
    buildJsonLd () {
      this.lrmi_text = '<script type="application/ld+json"> \n' +
        '{ \n \t' +
          '"@context": "http://schema.org/", \n \t' +
          '"@type": "CreativeWork", \n \t' +
          '"name": "' + this.entry.name + '", \n \t' +
          '"about": "' + this.entry.about + '", \n \t' +
          '"author": "' + this.entry.author + '", \n \t' +
          '"publisher": "' + this.entry.publisher + '", \n \t' +
          '"inLanguage": "' + this.entry.inLanguage + '", \n \t' +
          '"accessibilityAPI": ' + this.buildString(this.entry.accessibilityAPI) + ', \n \t' +
          '"accessibilityControl": ' + this.buildString(this.entry.accessibilityControl) + ', \n \t' +
          '"accessibilityFeature": ' + this.buildString(this.entry.accessibilityFeature) + ', \n \t' +
          '"accessibilityHazard": ' + this.buildString(this.entry.accessibilityHazard) + ', \n \t' +
          '"license": "' + this.entry.license + '", \n \t' +
          '"timeRequired": "' + this.entry.timeRequired + '", \n \t' +
          '"audience": { \n \t \t' +
            '"@type": "EducationalAudience" \n \t \t' +
            '"educationalRole": ' + this.buildString(this.entry.educationalRole) + ', \n \t' +
            '}, \n \t' +
          '"educationalAlignment": { \n \t \t' +
            '"@type": "AlignmentObject", \n \t \t' +
            '"alignmentType": ' + this.buildString(this.entry.alignmentType) + ', \n \t \t' +
            '"educationalFramework": "' + this.entry.educationalFramework + '", \n \t \t' +
            '"targetDescription": "' + this.entry.targetDescription + '", \n \t \t' +
            '"targetName": "' + this.entry.targetName + '", \n \t \t' +
            '"targetURL": { , \n \t \t \t' +
              '"@id": "' + this.entry.targetURL + '", \n \t \t' +
            '}, \n \t' +
          '}, \n \t' +
          '"educationalUse: ' + this.buildString(this.entry.educationalUse) + ', \n \t' +
          '"typicalAgeRange": "' + this.entry.typicalAgeRange + '", \n \t' +
          '"interactivityType": ' + this.buildString(this.entry.interactivityType) + ', \n \t' +
          '"learningResourceType": "' + this.entry.learningResourceType + '", \n \t' +
          '"isBasedOnUrl": "' + this.entry.isBasedOnUrl + '", \n' +
          '"url": "' + this.entry.url + '", \n' +
      '} \n ' +
      '<\/script>'
  },
    postData: function() {
        var url_prefix = ["http://", "https://"];
        if (url_prefix.some(el => this.entry.url.includes(el)) == false) {
          console.log("no given prefix found");
          this.entry.url = "https://" + this.entry.url;
        }
        console.log(this.entry);
        this.$http.post(this.getHostname(), this.entry, {headers: {'Authorization': 'Basic ZWxhc3RpYzpjaGFuZ2V0aGlzaW5wcm9kdWN0aW9u'}})
          .then(response => {
            console.log(response);
            // TODO improve this
            setTimeout(this.rerender, 1500);
          }, error => {
            console.log(error);
          })
      },
    getHostname: function() {
        console.log("Getting hostname for post data...")
        var ip = location.host;
        if (ip == 'localhost:8080') {
          ip = 'localhost'
        }
        console.log("Hostname is: " + ip);
        var es_url = "http://" + ip + "/es/mein_index/_doc";
        console.log("Builded url for posting to 'mein_index' is: " + es_url);
        return es_url;
    },
    checkMetadata: function() {

    },
    getSkos(vocab) {
      apiClient.vocabs.getVocab(vocab).then((res) => {
        res.data.vocabs.forEach((e) => {
          if (vocab == "educationalRole") {
            this.educationalRoleOptions.push({'value': e, 'text': e})
          } else if (vocab == "alignmentType") {
            this.alignmentTypeOptions.push({'value': e, 'text': e})
          } else if (vocab == "educationalUse") {
            this.educationalUseOptions.push({'value': e, 'text': e})
          } else if (vocab == "interactivityType") {
            this.interactivityTypeOptions.push({'value': e, 'text': e})
          }
        })
       })
       .catch((error) => {
         console.error(error);
       })
    }
  },
  created() {
      this.getSkos("educationalRole");
      this.getSkos("alignmentType");
      this.getSkos("educationalUse");
      this.getSkos("interactivityType");
  },
}
</script>