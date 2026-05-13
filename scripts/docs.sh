#!/bin/bash
set -e
echo "Generating Spectra SDK documentation..."
npm run docs
echo "Documentation generated at docs/api/index.html"
