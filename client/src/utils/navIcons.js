const icons = {};

const context = require.context('../Assets/navIcons', false, /\.svg$/);

context.keys().forEach((key) => {
  const iconName = key.replace('./', '').replace('.svg', '');
  icons[iconName] = context(key);
});

export default icons;