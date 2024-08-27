const path = require("path");
const projectPath = path.resolve(process.cwd());

const packageJson = require("./package.json");

const { exec } = require("child_process");

const packages = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
].filter(pk=> pk !== "expo");

const installPackage = (pkgs) => {
  if (pkgs.length === 0) {
    return;
  }

  const pkg = pkgs[0];
  console.log(`npx expo install ${pkg}`);

  exec(`npx expo install ${pkg}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }

    installPackage(pkgs.slice(1));
  });
};

installPackage(packages);
