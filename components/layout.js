const layoutStyle = {
  margin: 20,
  padding: 40,
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      {props.children}
    </div>
  )
}
