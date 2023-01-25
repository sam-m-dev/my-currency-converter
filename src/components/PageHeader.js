import img from './../assets/exchange.svg'

const headerContainerStyle={
    display:'flex',
    justifyContent:'center'
}

const headerTitle={
    display:'flex',
    justifyContent:'flex-start'
}

const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const imageDimensions={
    width:'100%',
    height:'100%'
}


function PageHeader(){
return(
    <header className="App-header col-12 col-sm-12 col-md-5">
            <div className="App-header-wrapper col-12" style={headerContainerStyle}>
            <div className="App-title col-10 col-sm-10 col-md-12" style={headerTitle}>
                <h1>Currency Converter</h1>
            </div>

                <div className="App-image col-2 col-sm-2 col-md-12" style={imageContainerStyle}>
                <img src={img} alt="decorative illustration" style={imageDimensions}/>
            </div>
        </div>
    </header>
)
}

export default PageHeader;