import React, { useEffect, useRef } from 'react';

const UpdateRecord = ({ submitHandle, rtype, rdata, ttl }) => {
  const recordType = useRef(null);
  const recordValue = useRef(null);
  const recordTTL = useRef(null);

  useEffect(() => {
    if (!rtype || !rdata) return;

    recordType.current.value = rtype;
    recordValue.current.value = rdata;
    recordTTL.current.value = ttl || 60;
  }, []);
  const saveRecord = async () => {
    console.log(recordType.current.value);
    console.log(recordValue.current.value);

    await submitHandle({
      rtype: recordType.current.value,
      rvalue: recordValue.current.value,
      ttl: recordTTL.current.value,
    });

    recordType.current.value = '';
    recordValue.current.value = '';
    recordTTL.current.value = '';
  };
  return (
    <div className="domain_container_component_content_grid_container">
      <div className="domain_container_component_content_grid_container_item">
        <select name="recordType" id="recordType" ref={recordType}>
          <option value="A">A</option>
          <option value="CNAME">CNAME</option>
          <option value="MX">MX</option>
          <option value="NS">NS</option>
          <option value="TXT">TXT</option>
          <option value="SRV">SRV</option>
          <option value="PTR">PTR</option>
          <option value="AAAA">AAAA</option>
        </select>
      </div>
      <div className="domain_container_component_content_grid_container_item">
        <input type="text" ref={recordValue} placeholder="Enter record value" />
      </div>
      <div className="domain_container_component_content_grid_container_item">
        <input type="number" ref={recordTTL} placeholder="TTL" />
      </div>
      <div className="domain_container_component_content_grid_container_item">
        <button onClick={saveRecord}>Save</button>
      </div>
    </div>
  );
};

export default UpdateRecord;
