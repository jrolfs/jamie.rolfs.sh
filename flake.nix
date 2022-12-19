{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        # buildNodejs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodejs/nodejs.nix> { python = pkgs.python3; };
        # nodejs-project = buildNodejs {
        #   enableNpm = true;
        #   version = "18.12.1";
        #   sha256 = "T6QGRRvFJlmikOUs/bIWKnYL1UnaS4u+vmop8pbZON8=";
        # };
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
