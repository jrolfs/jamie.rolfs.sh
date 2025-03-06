{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/d98abf5cf5914e5e4e9d57205e3af55ca90ffc1d";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell = with pkgs; pkgs.mkShell {
          buildInputs = [
            flyctl
            nodejs_22
            (yarn.override { nodejs = nodejs_22; })
          ];
        };
      });
}
