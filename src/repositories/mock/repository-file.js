/**
 * ファイルアップロードAPI
 */

export default {
  /**
   * ファイルアップロードAPI
   */
  upload(params) {
    const data = {
      fileList: [
        {
          folderName: params.fileList[0].folderName,
          fileName: params.fileList[0].fileName
        }
      ]
    };
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
  },
  /**
   * ファイル削除API
   */
  delete(params) {
    const data = {
      fileList: [
        {
          fileName: params.fileName
        }
      ]
    };
    return new Promise((resolve) => {
      return resolve({ data: data });
    });
  }
};
