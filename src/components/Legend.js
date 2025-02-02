import React from "react"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import * as ColorScheme from "../ColorScheme.js"


const Legend = () => {

  const onColorChange = (newColors) => {
    Array.from(document.querySelectorAll('#a')).map(function (value, index) {
      return value.style.backgroundColor = getColor(grades[index], newColors);
    });
  }

  ColorScheme.subscribe(onColorChange);

  function getColor(ranking, newColors) {
    if (newColors === null || newColors === undefined || newColors.colorTheme === null || newColors.colorTheme === undefined)
      return ColorScheme.fallbackColor;

    if (ranking >= 146) return newColors.colorTheme[5];
    else if (ranking >= 117) return newColors.colorTheme[4];
    else if (ranking >= 88) return newColors.colorTheme[3];
    else if (ranking >= 58) return newColors.colorTheme[2];
    else if (ranking >= 29) return newColors.colorTheme[1];
    else if (ranking >= 1) return newColors.colorTheme[0];
    else return ColorScheme.fallbackColor;
  }

  const grades = [1, 29, 58, 88, 117, 146, 174, "None"]

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const Default = (e) => {
    setAnchorEl(null);
    ColorScheme.setColorDefault();
  };

  const Greyscale = (e) => {
    setAnchorEl(null);
    ColorScheme.setColorGreyscale();
  };

  const Deutran = (e) => {
    setAnchorEl(null);
    ColorScheme.setColorDeuter();
  };

  const Tritan = (e) => {
    setAnchorEl(null);
    ColorScheme.setColorTritan();
  };

  const Protan = (e) => {
    setAnchorEl(null);
    ColorScheme.setColorProtan();
  };

  return (
    <div className="info">
      <div className="legend">
        <span className="title">Civil Discourse Ranking
        <Button title="Theme Selection" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={Default}>Default</MenuItem>
            <MenuItem onClick={Greyscale}>Greyscale</MenuItem>
            <MenuItem onClick={Deutran}>Deutran</MenuItem>
            <MenuItem onClick={Tritan}>Tritan</MenuItem>
            <MenuItem onClick={Protan}>Protan</MenuItem>
          </Menu>
        </span>

        {
          grades.map((value, i) => {
            return (
              <React.Fragment key={ value }>
                {
                  i <= 5 ?
                    <>
                      <span>
                        <span className="i" id="a" style={{ backgroundColor: getColor(grades[i] + 1, ColorScheme.getActiveColorScheme()) }}></span>
                        {grades[i]} &ndash; {grades[i + 1] - 1}
                      </span><br />
                    </> :
                    i === 7 ?
                      <>
                        <span>
                          <span className="i" id="na" style={{ backgroundColor: getColor(grades[7], ColorScheme.getActiveColorScheme()) }}></span>
                          {"Not available"}
                        </span><br />
                      </> : ""
                }
              </React.Fragment>)
          })
        }

      </div>

    </div>

  )

}

export default Legend
