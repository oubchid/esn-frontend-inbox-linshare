'use strict';

require('../app.constants');

angular.module('linagora.esn.unifiedinbox.linshare')
  .factory('inboxLinshareHelper', function(
    $q,
    INBOX_LINSHARE_ATTACHMENT_TYPE,
    DEFAULT_FILE_TYPE
  ) {
    return {
      documentToAttachment,
      getLinShareAttachmentUUIDsFromEmailHeader,
      setLinShareAttachmentUUIDsToEmailHeader
    };

    function documentToAttachment(document) {
      return {
        attachmentType: INBOX_LINSHARE_ATTACHMENT_TYPE,
        name: document.name,
        size: document.size,
        type: document.type || DEFAULT_FILE_TYPE,
        upload: {
          promise: $q.when(),
          cancel: angular.noop
        },
        uuid: document.uuid,
        status: 'uploaded'
      };
    }

    function getLinShareAttachmentUUIDsFromEmailHeader(email) {
      return email.headers && email.headers.LinShareAttachmentUUIDs ? email.headers.LinShareAttachmentUUIDs.trim().split(',') : [];
    }

    function setLinShareAttachmentUUIDsToEmailHeader(email, uuids) {
      email.headers = email.headers || {};
      email.headers.LinShareAttachmentUUIDs = uuids.join(',');
    }
  });
