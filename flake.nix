{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Ideally I'd love to be able to use Nix _with_ a specific Node version
        # specified in `.node-version`, which is what this does. The problem
        # is, it takes _forever_ to compile Node. I guess we'll track whatever
        # Node is in Nix with `.node-version` instead of the other way around.
        # I'm going to leave this here as an example just in case.
        buildNodejs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> { python = pkgs.python3; };
        nodejs-project = buildNodejs {
          enableNpm = true;
          version = nixpkgs.lib.traceVal (nixpkgs.lib.strings.fileContents ./.node-version);
          sha256 = "T6QGRRvFJlmikOUs/bIWKnYL1UnaS4u+vmop8pbZON8=";
        };
      in
      {
        devShell = with pkgs; pkgs.mkShell {
          buildInputs = [
            flyctl
            nodejs-18_x
            (yarn.override { nodejs = nodejs-18_x; })
          ];
        };
      });
}
