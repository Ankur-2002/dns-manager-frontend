import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import UpdateRecord from './UpdateRecord';
import { toast } from 'react-toastify';
import { POST } from '../../api/axios';

const DomainTile = ({
  domain,
  zoneId,
  deleteDomainRecord,
  fetchDomainsDetails,
}) => {
  const [openEditDomain, setOpenEditDomain] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(domain);
  const editDomainRecord = async recordData => {
    try {
      setLoading(true);
      const response = await POST(`/domain/edit-domain-records`, {
        ...recordData,
        domain: domain.domain,
        zoneId: zoneId,
        recordHash: domain.recordHash,
      });
      const data = response.data;
      console.log(data);
      toast.success('Record updated successfully');
      setOpenEditDomain(false);
      // We can also update the record in the state directly
      fetchDomainsDetails();
    } catch (error) {
      setOpenEditDomain(false);
      toast.error('An error occurred');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="domain_container_component_content_grid_container"
        key={domain.recordHash}
      >
        <div
          data-tooltip-id={domain.recordHash}
          className="domain_container_component_content_grid_container_item"
          data-tooltip-content={domain.rtype}
        >
          <Tooltip id={domain.recordHash} content={domain.rtype} />
          {domain.rtype}
        </div>
        <div
          className="domain_container_component_content_grid_container_item"
          data-tooltip-id={domain.recordHash + 'rdata'}
          data-tooltip-content={domain.rdata}
        >
          <Tooltip id={domain.recordHash + 'rdata'} content={domain.rdata} />
          {domain.rdata}
        </div>
        <div className="domain_container_component_content_grid_container_item">
          <Tooltip id={domain.recordHash + 'ttl'} content={domain.ttl} />
          {domain.ttl}
        </div>
        <div className="domain_container_component_content_grid_container_item">
          <button
            onClick={() => {
              setOpenEditDomain(!openEditDomain);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteDomainRecord(domain.recordHash, domain.rtype);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {openEditDomain && (
        <UpdateRecord
          editDomainRecord={true}
          submitHandle={editDomainRecord}
          rtype={domain.rtype}
          rdata={domain.rdata}
          ttl={domain.ttl}
        />
      )}
    </div>
  );
};

export default DomainTile;
