import React from "react";
//import styled from "styled-components/";
import $ from "jquery";

// const Wrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   margin-left: 0px;
//   margin-right: 0px;
// `;

// import vanillaJS Potree libs, /!\ would be best with proper ES6 import
const Potree = window.Potree;
const THREE = window.THREE
console.log(Potree);

export default class PointcloudNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.potreeContainerDiv = React.createRef();
  }

  render() {
    return (
        <div  className={"potree_container"} style={{ position: 'absolute', width: '100%', height: '100%', left: '0px', top: '0px'}}>
          <div ref={this.potreeContainerDiv} id="potree_render_area" ></div>
          <div id="potree_sidebar_container" style={{ display: "block"}} > </div>
        </div>
    );
  }
//   <div class="potree_container" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; ">
// 		<div id="potree_render_area" style="background-image: url('../build/potree/resources/images/background.jpg');"></div>
// 		<div id="potree_sidebar_container"> </div>
// 	</div>

//style={{ marginLeft: '300px', height: '100%'}}
//style={{ width: '300px', height: '100%'}}

  componentDidMount() {
    // initialize Potree viewer
    const viewerElem = this.potreeContainerDiv.current;

    const viewer = new Potree.Viewer(viewerElem);

    viewer.setEDLEnabled(true);
    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    // viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
    viewer.loadSettingsFromURL();

    // viewer.setControls(viewer.orbitControls);

    console.log({ viewer });

    viewer.loadGUI(() => {
        viewer.setLanguage('en');
        $("#menu_appearance").next().show();
        //viewer.toggleSidebar();
    });

    // Load and add point cloud to scene
    let url = "./pointclouds/test/metadata.json";
    Potree.loadPointCloud(url, "test", (e) => {
      viewer.scene.addPointCloud(e.pointcloud);

      let material = e.pointcloud.material;
      material.size = 1;
      material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

      viewer.fitToScreen();
    });
  }
}
