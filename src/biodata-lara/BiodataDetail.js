import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
 
    class BiodataDetail extends Component {
      constructor (props) {
        super(props)
        this.state = {
          biodata: {}
        }
      }
 
      componentDidMount () {
 
        const biodataId = this.props.match.params.id
 
        axios.get(`http://127.0.0.1:8000/api/biodata/${biodataId}`).then(response => {
          this.setState({
            biodata: response.data
          })
        })
      }
 
      render () {
        const { biodata } = this.state
 
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>Nama Mahasiswa: {biodata.nama}</div>
                  <div className='card-body'>
                    <p>Email: {biodata.email}</p>
                    <p>NO TELP : {biodata.no_hp}</p>
                    <p>PEKERJAAN: {biodata.pekerjaan}</p>
                  </div>
                  <div className='card-footer'>
                    <Link
                        className='badge badge-primary badge-pill'
                        to={`/lara`}
                        >Back
                    </Link>
                    <Link
                        className='badge badge-success badge-pill'
                        to={`/lara/edit/${biodata.id}`}
                        >Edit
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
 
export default BiodataDetail