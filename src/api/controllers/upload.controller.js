class UploadController {
  static uploadSingle(sigleFile) {
    return sigleFile?.path ?? '';
  }

  static uploadMultiple(files) {
    return files?.map((file) => file.path) ?? [];
  }
}

module.exports = UploadController;
