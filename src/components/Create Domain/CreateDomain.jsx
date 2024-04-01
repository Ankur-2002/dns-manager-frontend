import React, { useRef } from 'react';
import './CreateDomain.css';
import { toast } from 'react-toastify';
import { POST } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateDomain = () => {
  const domain = useRef();
  const status = useRef();
  const navigation = useNavigate();
  const submiyHandle = async () => {
    try {
      const domainValue = domain.current.value;
      const statusValue = status.current.value;
      if (!domainValue || !statusValue) {
        toast.error('Please fill all fields');
        return;
      }

      const response = await POST('/domain/create-domain', {
        name: domainValue,
        zoneType: statusValue,
      });

      console.log(response);
      if (response?.data?.domain?.zone?.compartmentId) {
        toast.success('Domain created successfully');
        domain.current.value = '';
        navigation('/');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <div className="create_domain_component_container">
      <div className="create_domain_component_container_header">
        <span>Create Domain</span>
      </div>

      <div className="create_domain_component_container_content">
        <div className="create_domain_component_container_content_form">
          <div className="create_domain_component_container_content_form_input">
            <label htmlFor="domain">Domain</label>
            <input type="text" id="domain" ref={domain} />
          </div>

          <div className="create_domain_component_container_content_form_input">
            <label htmlFor="status">Zone Type</label>
            <select name="status" id="status" ref={status}>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>

          <div className="create_domain_component_container_content_form_button">
            <button onClick={submiyHandle}>Create Domain</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDomain;
