'use strict';

const Layer = require('./layer.es6');

module.exports = class Network {

  /**
   * @param {Number} inputLayerSize
   * @param {Number} hiddenLayerSize
   * @param {Number} outputLayerSize
   */
  constructor(inputLayerSize, hiddenLayerSize, outputLayerSize) {
    this.hiddenLayer = new Layer(hiddenLayerSize, inputLayerSize + 1);
    this.outputLayer = new Layer(outputLayerSize, hiddenLayerSize + 1);
  }

  /**
   * @param {Array} inputs The inputs to the network.
   * @return {Array} The output of the network.
   */
  forward(inputs) {
    var hiddenLayerInputs = [1].concat(inputs);
    var hiddenOutput = this.hiddenLayer.forward(hiddenLayerInputs);

    var outputLayerInputs = [1].concat(hiddenOutput);
    var output = this.outputLayer.forward(outputLayerInputs);

    return output;
  }

  /**
   * @param {Array} errors The errors of the network's output.
   */
  backwardError(errors) {
    var hiddenLayerErrors = this.outputLayer.backwardError(errors);

    // Ignore the error that the hidden layer passes
    // back. This corresponds to the input, which we
    // cannot change.
    this.hiddenLayer.backwardError(hiddenLayerErrors);
  }

  updateWeights() {
    this.outputLayer.updateWeights();
    this.hiddenLayer.updateWeights();
  }
}
