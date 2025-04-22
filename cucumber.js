module.exports = {
  default: `--require-module ts-node/register \
            --require test/e2e/steps/**/*.ts \
            --format progress-bar \
            --publish-quiet \
            test/e2e/features/**/*.feature`,
};
