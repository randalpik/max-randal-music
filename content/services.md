---
title: "Services"
description: ""
images: []
draft: false
menu: main
weight: 3
---

<body class="main-page">
  <script type="application/javascript" src="../shift.js"></script>
  <h1>Transcription Services</h1>
  <p style="text-indent: 20px; margin-left: 20px;">Max is currently accepting offers for transcription and arrangement projects. If you have a recording that you would like him to transcribe, contact him using <a href="/contact">this form</a>. Please include a link to the audio file, and indicate whether you would like a piano reduction (preferred), full transcription, or arrangement for other instrumentation. Max will gladly work with you to customize the product to fit your ensemble and your own specific vision. After submitting a request, you will receive a reply with an estimated completion date and price (about $50 per minute of music, but negotiable based on the scope of the project). Payment will be accepted via Venmo.</p>
  <hr>
  <h1>Software</h1>
  <p style="text-indent: 20px; margin-left: 20px;">Max developed this web app as a tool to reinforce understanding of the idea of heptachord shift, a theory of modulation from the <a href="https://plogermethod.com/" target="_blank">Ploger Method</a>. The app will prompt you to change one note at a time in a given scale and keep up as it performs the shifts one at a time. Play with the settings to customize the time delay and other aspects of the modulation.</p>
  <div id = "GAME" style="background-color:#ebd4ff">
      <div style = "font-family: Helvetica, Arial, Sans-serif; font-size: 24px; font-weight: bold; text-align: center; color:#440477;">Heptachord Shift Game</div>
      <div id = "SL1">
          <label class = "shift_switch_container">
              <input type = "checkbox" id = "RESTRICTED">
              <div class = "shift_switch round"></div>
              <span class = "slabel">Restricted to Bach's 14 keys?</span>
          </label>
      </div>
      <div id = "SL2">
          <label class = "shift_switch_container">
              <input type = "checkbox" id = "SOLFEGE">
              <div class = "shift_switch round"></div>
              <span class = "slabel">Use solfege instead of letters?</span>
          </label>
      </div>
      <div id = "SL3">
          <label class = "shift_switch_container">
              <input type = "checkbox" id = "DOONLY">
              <div class = "shift_switch round"></div>
              <span class = "slabel">Start with C/Do only?</span>
          </label>
      </div>
      <div id = "S1">
          <label class = "slidecontainer">
              <input type="range" min="0" max="10" value="2" class="shift_slider" id="TIME">
              <span id = "OUTTIME">2 seconds per shift</span>
          </label>
      </div>
      <div id = "S2">
          <label class = "slidecontainer">
              <input type="range" min="5" max="100" value="10" class="shift_slider" id="NUM">
              <span id = "OUTNUM">generate 10 shifts</span>
          </label>
      </div>
      <div id = "RUN" style="margin: auto; width: 50%; padding-bottom: 5px;">
          <button class="shift_button" id = "STARTBUTTON">Start Shifting</button>
      </div>
      <div style = "height:170px; border:2px solid #440477; font:14px/26px Georgia, Garamond, Serif; overflow:auto; color:#440477; background-color:#f9e4ff; overflow:auto; color:#440477; background-color:#f9e4ff;" id = "OUTPUT">
      </div>
  </div>
  <style>
      #GAME {
        width:360px;
        height:527px;
        border-style:solid;
        border-width:5px;
        border-radius:3px;
        border-color:#440477;
        padding:5px;
        font-family: Georgia, Garamond, serif;
        -moz-user-select: none; -webkit-user-select: none;-ms-user-select: none; user-select: none;-webkit-user-drag: none; user-drag: none;
        margin: auto;
      }
      h2 {
        font-family: sans-serif;
        color: #440477;
        text-align: center;
      }
      .shift_button {
        width: 100%;
        background-color: #440477;
        border: none;
        outline: none;
        color: white;
        text-align: center;
        font-size: 16px;
        border-radius: 5px;
        padding: 15px 32px;
        -webkit-transition: .2s;
        transition: .2s;
      }
      .shift_button:hover {
        opacity: 0.7;
      }

      .shift_switch_container {
      }

      .shift_switch_container input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      .shift_switch {
        position: relative;
        cursor: pointer;
        height: 34px;
        width: 60px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cccccc;
        -webkit-transition: .4s;
        transition: .4s;
        box-sizing: content-box;
      }
      .shift_switch:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        box-sizing: border-box;
      }
      .slabel {
        display: inline-block;
        position: relative;
        width: 300px;
        margin-left: 70px;
        bottom: 28px;
        color: #440477;
      }

      input:checked + .shift_switch {
        background-color: #b319ff;
      }

      input:checked + .shift_switch:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }

      /* Rounded shift_switchs */
      .shift_switch.round {
        border-radius: 34px;
      }

      .shift_switch.round:before {
        border-radius: 50%;
      }
      .slidecontainer {
        position: relative;
        width: 100px;
        padding-bottom: 5px;
        -webkit-appearance: none;
      }

      /* The shift_slider itself */
      .shift_slider {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 150px; /* Full-width */
        height: 25px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
      }

      /* Mouse-over effects */
      .shift_slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
      }

      /* The shift_slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      .shift_slider::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific shift_slider handle width */
        height: 25px; /* shift_slider handle height */
        background: #440477; 
        cursor: pointer; /* Cursor on hover */
      }

      .shift_slider::-moz-range-thumb {
        width: 25px; /* Set a specific shift_slider handle width */
        height: 25px; /* shift_slider handle height */
        background: #440477;
        cursor: pointer; /* Cursor on hover */
        outline: none;
      }
      .slidecontainer span {
        position: relative;
        width: 200px;
        bottom: 6px;
        color: #440477;
      }
  </style>
</body>